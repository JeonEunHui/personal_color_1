from tensorflow.python.keras.preprocessing import image
from tensorflow.python.keras.preprocessing.image import ImageDataGenerator, load_img, array_to_img, img_to_array
import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

train_datagen = ImageDataGenerator(rescale = 1./255, # 모든 이미지 원소값들을 255로 나누기
                                   rotation_range=25, # 0~25도 사이에서 임의의 각도로 원본이미지를 회전
                                   width_shift_range=0.05, # 0.05범위 내에서 임의의 값만큼 임의의 방향으로 좌우 이동
                                   height_shift_range=0.05, # 0.05범위 내에서 임의의 값만큼 임의의 방향으로 상하 이동
                                   zoom_range=0.2, # (1-0.2)~(1+0.2) => 0.8~1.2 사이에서 임의의 수치만큼 확대/축소
                                   horizontal_flip=True, # 좌우로 뒤집기                                   
                                   vertical_flip=False,
                                   fill_mode='nearest'
                                  )
valid_datagen = ImageDataGenerator(rescale = 1./255)

class PersonalColorData():
    def __init__(self, dir):
        self.datalist = []
        self.dataimage = []
        self.datalabel = []
        
        self.season_encoding = {'spring': 0, 'summer': 1, 'fall': 2, 'winter': 3}
        self.sex_encoding = {'male': 0, 'female': 1}

        for (root, directories, files) in os.walk(dir):
            for d in directories:
                encoding_info = d.split('_')
                if len(encoding_info) != 2: continue
                temp_datalist = []
                temp_datalabel = []
                for (root2, directories2, files2) in os.walk(os.path.join(root, d)):
                    for file2 in files2:
                        file_path2 = os.path.join(root2, file2)
                        if file_path2[-4:] == '.jpg':
                            temp_datalist.append(file_path2)
                            temp_datalabel.append((self.season_encoding[encoding_info[0]], self.sex_encoding[encoding_info[1]]))
                temp_datalist = temp_datalist * (350 // len(temp_datalist))
                temp_datalist = temp_datalist[:346]
                temp_datalabel = temp_datalabel * (350 // len(temp_datalabel))
                temp_datalabel = temp_datalabel[:346]

                self.datalist += temp_datalist 
                self.datalabel += temp_datalabel 

        for d in self.datalist:
            img = load_img(d, target_size=(128,128))
            image_array = np.array(img, dtype=object)
            self.dataimage.append(image_array)

        self.dataimage = np.array(self.dataimage)

    
    def __len__(self):
        return len(self.datalist)


data = PersonalColorData('./dataset/')
valid = PersonalColorData('./valid/')

train_generator = train_datagen.flow(data.dataimage, data.datalabel, batch_size=32)
valid_generator = valid_datagen.flow(valid.dataimage, valid.datalabel, batch_size=16)



import tensorflow as tf
from tensorflow.python.keras.models import Model
from tensorflow.python.keras import models , layers
from tensorflow.python.keras.preprocessing.image import load_img
from tensorflow.python.keras.preprocessing.image import img_to_array
from tensorflow.python.keras.applications.vgg19 import VGG19
from tensorflow.python.keras.applications.vgg16 import VGG16

pre_trained_vgg = VGG16(include_top=False, input_shape = (128,128,3), weights='imagenet')
pre_trained_vgg.trainable = True

for layer in pre_trained_vgg.layers[:7]:
    layer.trainable = False
# print(pre_trained_vgg.layers)
h = pre_trained_vgg.layers[16]

x = layers.Flatten()(h.output)
x = layers.Dense(512, activation='relu')(x)
x = layers.Dropout(0.5)(x)
x = layers.Dense(128, activation='relu')(x)
x = layers.Dropout(0.5)(x)
x1 = layers.Dense(4,activation='softmax', name='output1')(x)
x2 = layers.Dense(2,activation='softmax', name='output2')(x)

add_model = Model(inputs=pre_trained_vgg.inputs, outputs=[x1, x2])

add_model.summary()

from tensorflow.python.keras.callbacks import ModelCheckpoint
from tensorflow.python.keras import optimizers, initializers , metrics
from tensorflow.python.keras.callbacks import LearningRateScheduler, EarlyStopping
import math
earlystopping = EarlyStopping(monitor='val_loss',  # 모니터 기준 설정 (val loss) 
                              patience=20,         # 10회 Epoch동안 개선되지 않는다면 종료
                             )

checkpoint = ModelCheckpoint(filepath='model3.h5',
                              monitor='val_loss',
                              mode='min',
                              save_best_only=True)

def step_decay(epoch):
    start = 0.0005
    drop = 0.8
    epochs_drop = 15.0
    lr = start * (drop ** np.floor((epoch)/epochs_drop))
    return lr
add_model.compile(loss='categorical_crossentropy',optimizer=tf.keras.optimizers.Adamax(),metrics=['acc'])
lr_scheduler = LearningRateScheduler(step_decay, verbose=1)
def three_way(gen):
    while True:
        x, y = gen.next()
        y1 = tf.keras.utils.to_categorical(y[:,0], 4)
        y2 = tf.keras.utils.to_categorical(y[:,1], 2)
        yield x, [y1,y2]

history = add_model.fit_generator(three_way(train_generator), # train_generator안에 X값, y값 다 있으니 generator만 주면 된다
                              validation_data=three_way(valid_generator),
                              steps_per_epoch=math.ceil(train_generator.n / train_generator.batch_size), # 한 번의 에포크(epoch)에서 훈련에 사용할 배치(batch)의 개수 지정; generator를 4번 부르겠다
                              epochs=100, # 데이터셋을 한 번 훈련하는 과정; epoch은 100 이상은 줘야한다
                              validation_steps=math.ceil(valid_generator.n / valid_generator.batch_size), # 한 번의 에포크가 끝날 때, 검증에 사용되는 배치(batch)의 개수를 지정; validation_generator를 4번 불러서 나온 이미지들로 작업을 해라
                              callbacks=[checkpoint,lr_scheduler,earlystopping])
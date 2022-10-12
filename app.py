from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
from unittest import result
import numpy as np

import cut_face
import tensorflow as tf


# Keras
from keras.applications.imagenet_utils import preprocess_input, decode_predictions
from keras.models import load_model
from keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH = 'models\modelvgg16.h5'

# Load your trained model
model = load_model(MODEL_PATH)
model.make_predict_function()          # Necessary
# print('Model loaded. Start serving...')

# You can also use pretrained model from Keras
# Check https://keras.io/applications/
#from keras.applications.resnet50 import ResNet50
#model = ResNet50(weights='imagenet')
#model.save('')
print('Model loaded. Check http://127.0.0.1:5000/')


def model_predict(img_path, model):
    img = tf.keras.utils.load_img(
        img_path, grayscale=False, target_size=(128, 128))

    # Preprocessing the image
    img = tf.keras.utils.img_to_array(img)
    img = img.reshape(1, 128, 128, 3)
    img = img.astype('float32')
    img = np.true_divide(img, 255)
    #img = np.expand_dims(img, axis=0)

    # Be careful how your trained model deals with the input
    # otherwise, it won't make correct prediction!
    #img = preprocess_input(img, mode='caffe')

    pred2, pred1 = model.predict(img)
    return pred2, pred1


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        #cut_face
        cut_face.cut_face(f.filename)
        
        # Make prediction
        pred2, pred1 = model_predict(file_path, model)
        pred2_class = pred2.argmax(axis=-1)
        list2 = ['Spring', 'Summer', 'Fall', 'Winter']
        result2 = list2[pred2_class[0]]

        pred1_class = pred1.argmax(axis=-1)
        list1 = ['Male', 'Female']
        result1 = list1[pred1_class[0]]

        result = result1+ result2
        
        return result
    return None

if __name__ == '__main__':
    app.run(debug=True)


import cv2 as cv
import numpy as np

import os

import argparse
import imutils
import dlib
from imutils import face_utils 

       
       
def cut_face(filename):  
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('./shape_predictor_68_face_landmarks.dat')
    
    #get file
    img_path = './uploads/' + filename
    img_path = img_path.replace(" ", '_')
    img_path = img_path.replace("(", '')
    img_path = img_path.replace(")", '')
        
    img = cv.imread(img_path)
    print(img_path)
    res = img

    #white
    '''
    final = cv.cvtColor(res, cv.COLOR_BGR2LAB)

    avg_a = np.average(final[:, :, 1])

    avg_b = np.average(final[:, :, 2])

    for x in range(final.shape[0]):
        for y in range(final.shape[1]):
            l, a, b = final[x, y, :]
            
            l *= 100/255.0

            final[x, y, 1] = a - ((avg_a-128)*(l/100.0)*1.1)
            final[x, y, 2] = b - ((avg_b-128)*(l/100.0)*1.1)
    
    final = cv.cvtColor(final, cv.COLOR_LAB2BGR)
    '''
    final = img

    #cut
    image = imutils.resize(final, width=500)
    gray = cv.cvtColor(image, cv.COLOR_BGR2LAB)
    rects = detector(gray, 1)
    
    for(i, rect) in enumerate(rects):
        shape = predictor(gray, rect)
        shape = face_utils.shape_to_np(shape)
        
        (x, y, w, h) = face_utils.rect_to_bb(rect)
        face = image[y:(y+h), x:(x+w)].copy()
        
    resized = imutils.resize(face, width=100)
    
    #cv.imshow('k', resized)
    #cv.waitKey(0)
    cv.imwrite(img_path, resized)


            
    
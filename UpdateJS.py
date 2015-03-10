# -*- coding: utf-8 -*-
import os
import os.path
import sys

def cur_file_dir():
     path = sys.path[0]
     if os.path.isdir(path):
         return path
     elif os.path.isfile(path):
         return os.path.dirname(path)


rootdir = cur_file_dir()
imgdir = cur_file_dir()+"\images"
arr = []

for parent,dirnames,filenames in os.walk(imgdir):
    for filename in filenames:
        if filename != "Transparent_google_logo.png":
            arr.append(filename)

for a in arr:
    print a

fileObject = open('content\google.js')
fileContent = fileObject.read()
fileObject.close()

pos1 = fileContent.find("images:") +8
pos2 = pos1 + fileContent[pos1:].find("],")

str = ""
for a in arr:
    a = "chrome.extension.getURL('images/"+a+"')"
    str += a+","
str = str[:-1]
fileContent = fileContent[:pos1]+str+fileContent[pos2:]

f = file('content\google.js','w')
f.write(fileContent)
f.close()
print "*"*4
print "done"
print "*"*4




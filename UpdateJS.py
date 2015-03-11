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
arr0 = []
#arr = []

i=1
while True:
     if os.path.isfile(imgdir+"\\"+str(i)+".jpg"):
          arr0.append(str(i)+".jpg")
          i = i+1
     elif os.path.isfile(imgdir+"\\"+str(i)+".png"):
          arr0.append(str(i)+".png")
          i = i+1
     elif os.path.isfile(imgdir+"\\"+str(i)+".bmp"):
          arr0.append(str(i)+".bmp")
          i = i+1
     else:
          break





for parent,dirnames,filenames in os.walk(imgdir):
    for filename in filenames:
        if filename != "Transparent_google_logo.png":
             if (filename[-3:] == "jpg" or filename[-3:] == "png" or filename[-3:] == "bmp") and (not filename in arr0):
                  os.rename(imgdir+"\\"+filename,imgdir+"\\"+str(i)+filename[-4:])
                  print str(i)+filename[-4:]
                  arr0.append(str(i)+filename[-4:])
                  i += 1



fileObject = open('content\google.js')
fileContent = fileObject.read()
fileObject.close()

pos1 = fileContent.find("images:") +8
pos2 = pos1 + fileContent[pos1:].find("],")

str = ""
for a in arr0:
    print a
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




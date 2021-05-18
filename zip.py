#!/usr/bin/env python
import os
import glob
import zipfile
from pprint import pprint

zipName = 'battle-info-master'

if __name__ == '__main__':
    zipf = zipfile.ZipFile(zipName + '.zip', 'w', zipfile.ZIP_DEFLATED)
    for filename in glob.glob('*.js'):
        zipf.write(filename, zipName + '/' + filename)
    for filename in glob.glob('*.json'):
        if filename == 'module.config.json':
            continue
        zipf.write(filename, zipName + '/' + filename)
    for filename in glob.glob('*.md'):
        zipf.write(filename, zipName + '/' + filename)
    zipf.close()

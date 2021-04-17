import sys
import json
import string

filterTypes = sys.argv[1]
processType = sys.argv[2]
fileName = sys.argv[3]

file = open('../../public/'+fileName, 'r')
writeFile = open('../../public/processed-'+fileName, 'w')

with open('../constants/slurs.json') as f:
   slurs = json.load(f)

filterTypes = filterTypes.split(",")
individualized = []
for f in filterTypes:
    individualized += slurs[f]

if processType == 'word':
    for line in file:
        split = line.translate(str.maketrans('', '', string.punctuation)).strip().split(" ")
        line = line.strip().split(" ")
        for i in range(len(split)):
            word = split[i].lower()
            if word in individualized:
                omitted = word[0] + "*" * (len(line[i])-2) + word[len(word)-1]
                line[i] = omitted
        line = ' '.join(line)
        print(line, file=writeFile)

if processType == 'sentence':
    for line in file:
        split = line.translate(str.maketrans('', '', string.punctuation)).strip().split(" ")
        line = line.strip().split(" ")
        for i in range(len(split)):
            word = split[i].lower()
            if word in individualized:
                line = ['This', 'line', 'has', 'been', 'omitted.']
        line = ' '.join(line)
        print(line, file=writeFile)
 
print('processed-'+fileName)


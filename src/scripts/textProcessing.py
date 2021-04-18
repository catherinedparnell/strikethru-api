import sys
import json
import string
from hatesonar import Sonar

# hate speech classifier from hatesonar python library
sonar = Sonar()

# grab proper arguments
filterTypes = sys.argv[1]
processType = sys.argv[2]
fileName = sys.argv[3]
chosenFilter = sys.argv[4]
countFlag = sys.argv[5]

# open proper files
file = open('../../public/'+fileName, 'r')
writeFile = open('../../public/processed-'+fileName, 'w')

with open('../constants/slurs.json') as f:
   slurs = json.load(f)

filterTypes = filterTypes.split(",")

# grab chosen filters and add to filterTypes list
if chosenFilter != "none":
    slurs["c"] = chosenFilter.split(",")
    filterTypes.append("c")

# load codes for counts if count flag present
if countFlag == 'yes' and processType == 'word':
    counts = {key: 0 for key in filterTypes}
    with open('../constants/codes.json') as f:
        slurCodes = json.load(f)

# process file by type and write to new processed file
if processType == 'word':
    for line in file:
        split = line.translate(str.maketrans('', '', string.punctuation)).strip().split(" ")
        line = line.strip().split(" ")
        for i in range(len(split)):
            word = split[i].lower()
            for f in filterTypes:
                subSlurs = slurs[f]
                if word in subSlurs:
                    omitted = word[0] + "*" * (len(line[i])-2) + word[len(word)-1]
                    line[i] = omitted
                    if countFlag == 'yes':
                        counts[f] += 1
        line = ' '.join(line)
        print(line)
if processType == 'sentence':
    for line in file:
        split = line.translate(str.maketrans('', '', string.punctuation)).strip()
        prediction = sonar.ping(text=split)
        if prediction['top_class'] == 'hate_speech':
            line = "This line is predicted to be hate speech by our classifier."
        print(line.strip())

# return for access to processed writeFile
print('processed-'+fileName)

# add counts to bottom of writeFile if count flag present
if countFlag == 'yes' and processType == 'word':
    print('\nCode Type:       Totals:', file=writeFile)
    for f in counts:
        print(slurCodes[f]+"        "+str(counts[f]))


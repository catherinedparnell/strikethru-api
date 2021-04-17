import sys
import json

print('Hello from python')
filterTypes = sys.argv[1]
processType = sys.argv[2]
pathToFile = sys.argv[3]

file = open(pathToFile, 'r')

with open('../constants/slurs.json') as f:
   slurs = json.load(f)

for line in file:
    print(line)

# if processType == 'sentence':
    # process by sentence
# if processType == 'word':
    # process per word

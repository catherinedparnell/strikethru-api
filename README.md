# strikethru-api
strikethru api for HackDartmouth 2021

## Documentation
* `/user/:username`
  
  **POST** - Adds user 
  
  `req.body = { name: the name of user }`
  
  Returns: `{
 `    "result": {
        "chosenFilter": "none",
        "name": string
    }
}`
  
  **GET** - Gets user and all corresponding preferences & information
  
  Returns: ` {
    "result": {
        "name": "cath",
        "chosenFilter": string of chosen words separated by commas or none,
        "filterTypes": string of codes separated by commas,
        "processType": 'word' | 'sentence'
    }
}`
  
  **PUT** — Updates user processing information
  
  
  ` req.body = { 
      processType: 'word'|'sentence', 
      filterTypes: string of codes separated by commas, 
      chosenFilter: string of chosen words separated by commas or none
  }`
  
  Returns: ` {
    "result": {
        "name": "cath",
        "chosenFilter": string of chosen words separated by commas or none,
        "filterTypes": string of codes separated by commas,
        "processType": 'word' | 'sentence'
    }
}`
  
  **DELETE** — Deletes user
  
    
 * `/upload`
  
    **POST** — Uploads txt file for processing 
    
    `req.body = { file }`
    
    Returns: `filename`
    
 * `/text/:username`

    **POST** — Processes previously uploaded file 
    
    `req.body = { filename, countFlag: 'yes' for counts, 'no' otherwise }`

    Returns: `filename`

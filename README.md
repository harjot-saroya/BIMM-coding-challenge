The way this api works is by fetching data from the xml endpoints and displaying it on 
http://localhost:3001/

I tried to print the results to a file but unfortunately this only works locally (running node server.js) so I decided to paste the results to the localhost instead

1. Clone repo at https://github.com/harjot-saroya/BIMM-coding-challenge
2. Run docker build -t express .
3. Run docker run -p 3001:3001 express
3. Go to http://localhost:3001/ and wait and after some time you should get a list of json objects of information of all makeIds

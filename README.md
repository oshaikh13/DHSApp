DHS App

Starter Repo

run ionic state reset in main DHSApp folder to set up plugins

Interception Data from Skywarddhs.

Sample Authentication respoonse from POST: https://skywarddhs.isg.edu.sa/scripts/wsisa.dll/WService=wsEAPlusDHS/skyporthttp.w

<li>5246231^10492462^9365410^797959^6772^shaikoma000^2^sfhome01.w^false^no ^no^no^^rdbcindibiTaLjln^</li>


Home request now requires various keys. 
1. duserid: shaikoma000
2. dwd: 5246231
3. enc: rdbcindibiTaLjln
4. web-data-recid: 10492462
5. wfaacl: 797959
5. wfaacl-recid: 9365410
6. nameid: 6772

Post this data to https://skywarddhs.isg.edu.sa/scripts/wsisa.dll/WService=wsEAPlusDHS/sfhome01.w

??
$$ profit

Rest of the keys are unknown at this point. The three "no" keys remain the same. So does the false. 

If any employee from skyward is looking at this repo, please PR and clarify. Thanks
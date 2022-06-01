#!/bin/bash

echo "Add Commit Push: $1";

if [ "$#" -eq 1 ]
 then
git add *
git commit -m "Japanese datatables"
git push -u origin main
else
 echo "Pass commit string"
fi

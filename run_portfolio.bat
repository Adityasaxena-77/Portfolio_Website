@echo off
title Aditya Saxena Portfolio Web Server
echo Starting Aditya Saxena Portfolio Web Server...
echo Opening browser at http://localhost:5173 ...
start http://localhost:5173
python -m http.server 5173
pause

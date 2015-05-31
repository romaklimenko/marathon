for($i = 1; $i -le 12000; $i++) {
    Write-Host $i
    Invoke-WebRequest -Uri "http://live.ultimate.dk/desktop/front/data.php?eventid=2601&mode=participantinfo&pid=$i&language=us" -OutFile .\raw-data\$i-raw.html
}
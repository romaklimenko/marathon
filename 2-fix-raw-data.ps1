foreach($raw_file in Get-ChildItem .\raw-data){
    $content = Get-Content $raw_file.FullName
    $content = $content[0].Replace("document.getElementById('PARTICIPANTINFO').innerHTML='", "")
    $content = $content.Substring(0, $content.Length - 2)  
    $content | Out-File $raw_file.FullName
}
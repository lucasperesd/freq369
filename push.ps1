$git = "C:\Users\Lucas Peres\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"
$gh = "C:\Program Files\GitHub CLI\gh.exe"

$token = (& $gh auth token).Trim()
$remoteUrl = "https://" + $token + "@github.com/lucasperesd/freq369.git"

& $git add .
& $git commit -m "chore: atualizar gitignore e limpar arquivos"
& $git remote set-url origin $remoteUrl
& $git push origin main
& $git remote set-url origin "https://github.com/lucasperesd/freq369.git"

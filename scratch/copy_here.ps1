$sh = New-Object -ComObject Shell.Application
$bin = $sh.Namespace(10)
$targetPath = "C:\Users\fernd\OneDrive\Desktop\Interfaz de turismo nacional\public\audios_en"
New-Item -ItemType Directory -Force $targetPath
$targetFolder = $sh.Namespace($targetPath)

foreach ($item in $bin.Items()) {
    Write-Host "Item in bin: $($item.Name)"
    if ($item.Name -like "*ingles*" -or $item.Name -like "*audio*") {
        Write-Host "Copying $($item.Name) to target..."
        $targetFolder.CopyHere($item)
    }
}

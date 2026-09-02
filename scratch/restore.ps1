$sh = New-Object -ComObject Shell.Application
$bin = $sh.Namespace(10)
$target = "C:\Users\fernd\OneDrive\Desktop\Interfaz de turismo nacional\public\audios_en"
New-Item -ItemType Directory -Force $target

foreach ($item in $bin.Items()) {
    Write-Host "Found in Bin: $($item.Name)"
    if ($item.IsFolder) {
        $folder = $item.GetFolder
        foreach ($sub in $folder.Items()) {
            Write-Host "  Subitem: $($sub.Name) at $($sub.Path)"
            Copy-Item -Path $sub.Path -Destination "$target\$($sub.Name)" -Force
        }
    } else {
        if ($item.Name -like "*.mp3") {
            Write-Host "  File: $($item.Name) at $($item.Path)"
            Copy-Item -Path $item.Path -Destination "$target\$($item.Name)" -Force
        }
    }
}

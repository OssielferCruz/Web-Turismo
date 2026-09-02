$sh = New-Object -ComObject Shell.Application
$bin = $sh.Namespace(10)
$target = "C:\Users\fernd\OneDrive\Desktop\Interfaz de turismo nacional\public\audios_en"

foreach ($item in $bin.Items()) {
    if ($item.IsFolder) {
        try {
            $folder = $item.GetFolder
            if ($folder) {
                foreach ($sub in $folder.Items()) {
                    if ($sub.Name -like "*.mp3") {
                        Write-Host "Restoring mp3 from folder: $($sub.Name) at $($sub.Path)"
                        Copy-Item -Path $sub.Path -Destination "$target\$($sub.Name)" -Force
                    }
                }
            }
        } catch {}
    } else {
        if ($item.Name -like "*.mp3") {
            Write-Host "Restoring mp3 file: $($item.Name) at $($item.Path)"
            Copy-Item -Path $item.Path -Destination "$target\$($item.Name)" -Force
        }
    }
}

import win32com.client
import os
import shutil

def restore_items():
    shell = win32com.client.Dispatch("Shell.Application")
    recycle_bin = shell.Namespace(10) # 10 is CSIDL_BITBUCKET
    items = recycle_bin.Items()
    
    target_dir = r"C:\Users\fernd\OneDrive\Desktop\Interfaz de turismo nacional\public\audios_en"
    os.makedirs(target_dir, exist_ok=True)
    
    found = 0
    for item in items:
        name = item.Name
        if "ingles" in name.lower() or "alcaldia" in name.lower() or "palacio" in name.lower() or "paraninfo" in name.lower() or "zaragoza" in name.lower() or "asuncion" in name.lower() or "casadabayle" in name.lower():
            print(f"Found item in Recycle Bin: {name} (Path: {item.Path})")
            # Check if it's a folder or file
            if item.IsFolder:
                folder_items = item.GetFolder.Items()
                for subitem in folder_items:
                    print(f"  Subitem: {subitem.Name} -> {subitem.Path}")
                    # Invoke restore or copy out
                    dest = os.path.join(target_dir, subitem.Name)
                    try:
                        shutil.copy2(subitem.Path, dest)
                        print(f"  Copied {subitem.Name} to {dest}")
                        found += 1
                    except Exception as e:
                        print(f"  Copy error: {e}")
            else:
                dest = os.path.join(target_dir, name)
                try:
                    shutil.copy2(item.Path, dest)
                    print(f"  Copied {name} to {dest}")
                    found += 1
                except Exception as e:
                    print(f"  Copy error: {e}")
                    
    print(f"Restored total {found} items.")

if __name__ == "__main__":
    restore_items()

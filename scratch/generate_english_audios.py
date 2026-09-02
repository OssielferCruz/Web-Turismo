from gtts import gTTS
import os

sites_en = [
    {
        "filename": "alcaldiaingles.mp3",
        "text": "Welcome to the León Municipal City Hall. Built in 1942 on the historic Plaza Mayor, this magnificent Art Déco building serves as the political and administrative heart of the city of León, Nicaragua."
    },
    {
        "filename": "palacioingles.mp3",
        "text": "Welcome to the Departmental Palace, home to the Revolution Museum. Designed in 1935 by architect Marcelo Targá, this neoclassical monument preserves the rich history and revolutionary memory of León."
    },
    {
        "filename": "paraninfoingles.mp3",
        "text": "Welcome to the Paraninfo UNAN-León Central Building. Formerly the Convent of La Merced built in 1680, this historic site has been the cradle of higher education in Nicaragua since 1812."
    },
    {
        "filename": "zaradozaingles.mp3",
        "text": "Welcome to Our Lady of the Pillar Zaragoza Church. Constructed between 1884 and 1934 in unpainted exposed stone, this unique fortress church is an architectural treasure on the border with Sutiava."
    },
    {
        "filename": "casadabayleingles.mp3",
        "text": "Welcome to the Former Debayle Health House. Established in 1814 as a colonial mansion, Dr. Luis Henry Debayle founded Central America's first private surgical clinic here in 1900. Today it houses the Mariana Sansón School of Fine Arts."
    },
    {
        "filename": "asuncioningles.mp3",
        "text": "Welcome to La Asunción Chapel and School. Combining the 1679 former Episcopal Palace with a breathtaking 1935 Neogothic chapel, this complex features European polychrome stained glass windows."
    }
]

output_dir = r"C:\Users\fernd\OneDrive\Desktop\Interfaz de turismo nacional\public\audios_en"
os.makedirs(output_dir, exist_ok=True)

for site in sites_en:
    filepath = os.path.join(output_dir, site["filename"])
    print(f"Generating English audio for {site['filename']}...")
    tts = gTTS(text=site["text"], lang="en", slow=False)
    tts.save(filepath)
    print(f"Saved {filepath} ({os.path.getsize(filepath)} bytes)")

print("All 6 English MP3 audio files generated successfully!")

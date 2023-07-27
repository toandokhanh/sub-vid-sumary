# from summa import summarizer
# from summa import keywords
# from summa.summarizer import summarize  

# with open('data/long_video_sub.txt', 'r', encoding='utf-8') as file:
#     text = file.read()

# print('text')
# print(text)
# print('summarizer.summarize(text)')
# print(summarizer.summarize(text))

# text = "Việt Nam tên chính thức của Cộng hòa xã hội chủ nghĩa Việt Nam là một quốc gia nằm ở đảo Đông Dương ở Đông Nam Á Biên giới Biển Đông và Biển Đông ở phía đông biên giới Campuchia và Lao Laothe North giáp với Thái Lan ở Thái Lan ở Thái Lan ở Thái LanTây Nam Thủ đô Việt Nam là Hà Nội và thành phố lớn nhất là Thành phố Hồ Minh (trước đây được gọi là Sài Gòn)"

# sentences = text.split()

# for sentence in sentences:
#     print(sentence)

# from rpunct import RestorePuncts
# # The default language is 'english'
# rpunct = RestorePuncts()
# text = rpunct.punctuate("""in 2018 cornell researchers built a high-powered detector that in combination with an algorithm-driven process called ptychography set a world record
# by tripling the resolution of a state-of-the-art electron microscope as successful as it was that approach had a weakness it only worked with ultrathin samples that were
# a few atoms thick anything thicker would cause the electrons to scatter in ways that could not be disentangled now a team again led by david muller the samuel b eckert
# professor of engineering has bested its own record by a factor of two with an electron microscope pixel array detector empad that incorporates even more sophisticated
# 3d reconstruction algorithms the resolution is so fine-tuned the only blurring that remains is the thermal jiggling of the atoms themselves""")

# print(text)


from googletrans import Translator

def is_english(text):
    try:
        # Kiểm tra xem văn bản có phải tiếng Anh hay không bằng cách dùng translate từ tiếng Anh sang tiếng Anh
        translator = Translator()
        translation = translator.translate(text, src='en', dest='en')
        if translation.text.lower() == text.lower():
            return True
        else:
            return False
    except Exception as e:
        print("Lỗi xảy ra trong quá trình kiểm tra ngôn ngữ:", str(e))
        return False

def translate_to_english(text):
    try:
        translator = Translator()
        translation = translator.translate(text, dest='en')
        return translation.text
    except Exception as e:
        print("Lỗi xảy ra trong quá trình dịch:", str(e))
        return None

# Đọc văn bản từ file
with open('data/long_video_sub.txt', 'r', encoding='utf-8') as file:
    text = file.read()

print('Text:')
print(text)

if not is_english(text):
    translated_text = translate_to_english(text)
    if translated_text is not None:
        print('Text đã được dịch sang tiếng Anh:')
        print(translated_text)
    else:
        print('Không thể dịch văn bản sang tiếng Anh.')
else:
    print('Văn bản là tiếng Anh.')

# import io
# import os,sys
# import createsub

# audio_file_path = "20230812_072839/0.wav"
# createsub.main(audio_file_path,'vi','vi')

# # python3 subtitle.py -video {path_video} 


from gtts import gTTS
import os
from pydub import AudioSegment

def text_to_speech(text, output_file):
    tts = gTTS(text, lang='vi')  # Lựa chọn ngôn ngữ là tiếng Việt
    tts.save(output_file)
    print(f"Đã tạo file âm thanh: {output_file}")

def convert_to_wav(input_file, output_file):
    sound = AudioSegment.from_mp3(input_file)
    sound.export(output_file, format="wav")
    print(f"Đã tạo file âm thanh định dạng .wav: {output_file}")

def read_srt_file(file_path):
    subtitles = []
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.read().splitlines()

    i = 0
    while i < len(lines):
        timecode_line = lines[i]
        subtitle_line = lines[i + 1]
        
        # Kiểm tra xem dòng thời gian có chứa cặp thời gian hay chỉ có một giá trị
        if ' --> ' in timecode_line:
            start_time, end_time = timecode_line.split(' --> ')
            subtitles.append((start_time, end_time, subtitle_line))
        else:
            start_time = timecode_line
            end_time = None
            subtitles.append((start_time, end_time, subtitle_line))
        
        i += 2

    return subtitles


def time_to_seconds(time_str):
    h, m, s = map(int, time_str.replace(',', '.').split(' --> ')[0].split(':'))
    return h * 3600 + m * 60 + s

def process_subtitles(subtitles):
    for i, (start_time, end_time, subtitle) in enumerate(subtitles):
        if end_time is not None:
            duration = time_to_seconds(end_time) - time_to_seconds(start_time)
        else:
            duration = 0
        
        output_file = f"subtitle_{i + 1}.wav"
        text_to_speech(subtitle, output_file)
        
        print(f"Đã tạo file âm thanh cho phụ đề {i + 1}: {output_file} (Thời gian: {duration:.2f} giây)")


# Ví dụ sử dụng:
srt_file = "20230812_072839/0.srt"
subtitles = read_srt_file(srt_file)
process_subtitles(subtitles)
# Ví dụ sử dụng:
# text = "Xin chào! Đây là ví dụ về chuyển đổi văn bản thành giọng nói."
# mp3_output_file = "output.mp3"
# text_to_speech(text, mp3_output_file)

# wav_output_file = "output.wav"
# convert_to_wav(mp3_output_file, wav_output_file)

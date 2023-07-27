import requests

def sumy(text, count=1, algorithm='lexrank'):
    url = 'https://huggingface.co/spaces/issam9/sumy_space'

    headers = {
        'Content-Type': 'application/json',
    }

    data = {
        'text': text,
        'lines_count': count,
        'algorithm': algorithm,
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result['summary']
    else:
        return None

text = """
The_current Politburo consists of the current Politburo , who is the 13th course with a total of 16 members who are the Politburo members , including Mr. Nguyen_Phu Trong General_Secretary , Vo Van_Thuong , President of the Presidency Pham_Minh Chinh Prime Minister_Vuong Dinh_Hue , Chairman of the National_Assembly , Mr. Truong_Thi_Mai , Standing Secretary of the Central Committee of the Central_Organization , Mr. Tran_Cam , Tu , Chairman of the Central Inspection CommitteePhan Van_Giang , Minister of Defense , General_General , To Lam Minister of Public_Security .
Mr. Nguyen_Van_Secretary of Ho_Chi Minh City Party_Committee , Mr. Dinh_Tien , Dung Secretary of Hanoi_City Party_Committee , Mr. Phan_DinhHead of the Central Committee of Internal_Affairs , Mr. Tran_Thanh_Man Standing Vice Chairman of the National_Assembly , Mr. Nguyen_Xuan Dang , Chairman of the Central theoretical Council , Director of Ho_Chi Minh_National Political_Academy , Mr. General_Luong CuongResponsibility of the General_Department of Politics of the Vietnam_People ' s Army , Mr. Nguyen_Hoa_Binh , the Supreme People ' s Court and finally Mr. Tran_Tuan Anh , Head of Economic_Committee . .
"""

lex = sumy(text)
print(lex)
# ทำไปทำไม

สาเหตุล ที่ทำเกิดจากการที่วิชา software dev2 เขาบังคับให้ทำโปรเจคจบ เเต่โปรเจคทุกอันมันก็จะมั่วซั่วหลุดโลกเกินไป ครูเลย scope ให้เลือกประมาน 7 โปรเจค เป็นงานเดี่ยว เเล้ววันที่จับฉลาก เพื่อจะได้เลือกโปรเจควิชา ผมก็ดันท้องเสียพอดี ไม่ได้จับฉลาก ก็เลยเหลือเเต่โปรเจคอะไรที่ดูจะ ตึงๆ ยากๆ ทั้งนั้น ผมก็เลย โชว์ความเก่า ไปเลย ให้สมกับที่ผมเป็นสาย programmer ผมก็เลยเอาโปรเจค เเจ้งเตือนกิจกรรมนักศึกษาซะเลย

<br>

# ประโยชน์ที่หวังว่าจะได้

ก็คือทำเเล้วได้เกรต A วิชานี้ เเล้วก็ไม่ใช่เเค่นั้นหรอก ผมมองว่าโปรเจคนี้จะได้ใช้งานจริงๆ เเต่ก็ไม่อยากให้เป็นการบังคับว่าต้องทำกิจกรรมให้ครบเท่าไรๆ ไม่งั้นไม่ผ่าน เพราะถ้าทำเเบบนั้นไป เชื่อดิ เด็กก็ต้องลงชื่อหลอกๆ ในกิจกรรม หรือหาเทคนิคในการ farm ชั่วโมงกิจกรรม เเบบเกรียนๆ ผมไม่ต้องการให้เป็นเเบบนั้นเลย เเต่สิ่งที่ผม aspect ไว้ก็คือ เป็น สื่อกลางที่ทำให้เด็กไม่พลาดกิจกรรมที่น่าสนใจ เเล้วก็ได้ร้กิจกรรมล่วงหน้า นานๆ อย่างเช่นกรณีงาน `tesa topgun` ที่กว่าเด็กจะรู้เรื่องว่าจัดกว่าจะบอกต่อๆ กว่าจะ form team ก็หาทันไม่เสียเเล้ว เเล้วใหนจะงานกิจกรรมอีกมากมาย หรือการจัดอบรมณ์การพัฒณาตัวเอง หรือเรื่องการขายซึ่งก็สำคัญมาก เเต่ก็พลาดไปหลายตัวเลย รวมถึงกิจกรรมที่จะปลูกฝังทัศณะคติ หรือว่าสิ่งที่ดีงาม เด็กบางคนก็อาจจะมั่ว ไม่อมไปเข้าร่วม ระบบนี้ก็จะ
`tracking` ได้หมด ถือได้ว่าเป็นระบบที่ทำได้ทั้งให้เเรงบันดานใจ เเล้วก็บังคับเด็กไปในตัว เเต่สุดท้ายเลยจากทัศณะคติผม ผมไม่อยากให้ focus กับเรื่องกิจกรรมมาก อยากให้เอาเเค่พอขำๆ เหมือนได้มี moment น่าจดจำ เเค่นั้นพอ `อยากให้ focus เรื่องการทำไงก็ได้ให้พร้อมกับการทำงานในอนาคตมากกว่า` ยิ่งสมัยนี้ AI ก็กำลังจะมาเเทนหลายๆ งานเเล้วด้วย ยิ่งต้องจริงจังเรื่องการหางานมากเข้าไปอีก

<br>

# requirement

$ npm list --save

cookie-parser@1.4.6

ejs@3.1.8

express-session@1.17.3

express@4.18.2

mongoose@6.9.1

nodemon@2.0.20

    $ npm init -y
    $ npm i cookie-parser ejs express-session express mongoose nodemon --save

> เอา code copy ลง terminal directory งานเลย            
ถ้าอยากติดั้งเครื่องมือเเบบที่ผมใช้ 
<br>
--save คือ embeded lib ลงไปใน folder งาน copy folder ไปที่ใหนก็ใช้ lib ได้เลย 
<br>
-g ใช้เเทน --save ถ้าอยากเอาดั้งเเต่ในเครื่องเรา เป็นการิดตั้ง global ในเครื่องเราเอง

<br>

# model

example record in user collection 

    {
    "username": "test",
    "password": "test",
    "score": 99,
    "fname": "testfirstname",
    "lname": "testlastname"
    }

หมายเหตุ username จะเป็นรหัสนักศึกษา เเล้วในรหัสนึกศึกษา จะบ่งบอกในตัวเองอยู่เเล้วว่า

- ชั้นปีอะไร เช่น ปี62 ปี63 ปี64 ปี65
- สาขา คณะ อะไร
- เป็นนักศึกษาคนใหน

ตัวอย่าง 64 103010 19  รหัสนึกศีกษาผมเองเเหละ โดยที่ 19 น่าจะเป็นเลขที่

    {
    title: "demotitle",
    discribe: "demodescription",
    requireBranch: ["fdt","btech"],
    requireGen:[64,65],
    start: {
        year: 2023,
        month: 2,
        day: 19,
        hour: 16,
        minites:22
    }

โดยที่ requireGen กับ requireBranch ไม่ต้องใส่ก็ได้ เพราะว่าผม set ค่า default ไว้เเล้ว

จาก `./models/eventModel.js`

    requireGen:{type: Array, default: allGen},
    requireBranch: { type: Array, default: allBranch},


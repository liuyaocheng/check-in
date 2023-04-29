import axios from 'axios'
const userList = []
const email = process.env.email.split(',')
const passwd = process.env.passwd.split(',')

email.forEach((e, i) => {
  userList.push({
    email: e,
    passwd: passwd[i]
  })
})
function checkIn() {
  userList.forEach(item => {
    axios
      .post('https://go.tofly.cyou/auth/login', {
        email: item.email,
        passwd: item.passwd,
        code: ''
      })
      .then(({ data, headers }) => {
        console.log(data)
        if (data.ret) {
          const cookie = headers['set-cookie'].join(';')
          axios
            .post(
              'https://go.tofly.cyou/user/checkin',
              {},
              {
                headers: {
                  cookie: cookie
                }
              }
            )
            .then(({ data }) => {
              if (data.ret) {
                console.log(data.msg, 1)
              } else {
                console.log(data.msg, 2)
              }
            })
        }
      })
  })
}
checkIn()

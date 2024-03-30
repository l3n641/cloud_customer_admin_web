export function getTimeRangeEndWithToday(days) {
  const today = new Date().setHours(0, 0, 0, 0)
  const end = today + 3600 * 1000 * 24 - 1
  const start = today - 3600 * 1000 * 24 * (days - 1)
  return [start, end]
}

export function getMessageFormatTime(createdAt) {
  const inputTime = new Date(createdAt)
  const hours = inputTime.getHours().toString().padStart(2, '0')
  const minutes = inputTime.getMinutes().toString().padStart(2, '0')
  return hours + ':' + minutes
}

export function getMessageFormatDate(createdAt) {
  const inputTime = new Date(createdAt)
  const year = inputTime.getFullYear()
  const month = (inputTime.getMonth() + 1).toString()
  const day = inputTime.getDate().toString()
  return year + '-' + month + '-' + day
}

export function compareDates(currentTime, destTime) {
  // 转换为 Date 对象
  const ctime = new Date(currentTime)
  const date = new Date(destTime)

  // 获取日期的时间戳（去掉时、分、秒）
  const timestamp1 = Date.UTC(ctime.getFullYear(), ctime.getMonth(), ctime.getDate())
  const timestamp2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())

  // 计算日期差距（以天为单位）
  const daysDifference = Math.abs((timestamp2 - timestamp1) / (1000 * 60 * 60 * 24))

  // 判断日期差是否大于1天
  return daysDifference > 1
}

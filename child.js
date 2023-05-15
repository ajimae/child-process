console.log(`child created on process '${process.pid}'`)

process.on('message', function(message) {
  const data = isPrime(message)

  process.send({ pid: process.pid, data })
  setTimeout(process.exit, 2000)
})

function response({ number, factors, isPrime}) {
  return {
    number,
    factors,
    isPrime
  }
}

function isPrime(number) {
  const factors = []

  if (number < 1)
    return response({
      number,
      factors,
      isPrime: false
    })

  if (number == 1)
    return response({
      number,
      factors,
      isPrime: true
    })

  for(var i = 2; i < number; ++i) {
    if (number % i == 0) {
      factors.push(i)
    } 
  }

  return {
    number,
    factors,
    isPrime: !(factors.length > 0)
  }
}



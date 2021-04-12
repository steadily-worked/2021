function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // 50보다 높으면 에러 발생시키기
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result); // number 값에 +10 후 성공 처리
    }, 1000);
  });
  return promise;
}

async function runTasks() {
  try {
    let result = await increment(0);
    console.log(result);
    result = await increment(result);
    console.log(result);
    result = await increment(result);
    console.log(result);
    result = await increment(result);
    console.log(result);
    result = await increment(result);
    console.log(result);
    result = await increment(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

// increase(0)
//   .then((number) => {
//     // Promise에서 resolve된 값은 .then을 통해 받아 올 수 있음
//     console.log(number);
//     return increase(number); // Promise를 리턴하면
//   })
//   .then((number) => {
//     // 또 .then으로 처리 가능
//     console.log(number);
//     return increase(number);
//   })
//   .then((number) => {
//     console.log(number);
//     return increase(number);
//   })
//   .then((number) => {
//     console.log(number);
//     return increase(number);
//   })
//   .then((number) => {
//     console.log(number);
//     return increase(number);
//   })
//   .catch((e) => {
//     // 도중에 에러가 발생한다면 .catch를 통해 알 수 있음
//     console.log(e);
//   });

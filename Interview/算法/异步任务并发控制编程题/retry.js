const request = async () => {
  const success = Math.random() > 0.7;

  if (!success) {
    throw new Error("请求失败");
  }

  return "success";
};

const retry = async (fn, retryCount, delay) => {
  for (let i = 0; i <= retryCount; i++) {
    try {
      console.log(" 重试", i);
      return await fn();
    } catch (error) {
      if (i === retryCount) {
        throw error;
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

try {
  const result = await retry(request, 3, 1000);
  console.log("result:", result);
} catch (error) {
  console.log("error:", error.message);
}
export {};

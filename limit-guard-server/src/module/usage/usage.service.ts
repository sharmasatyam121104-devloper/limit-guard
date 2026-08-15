import redis from "../../config/redis.config";

interface endpointInterface {
    endpointName: string;
    status: string;
    statusCode: number;
    latency: number;
}

export const usageData = async (userId: string, endpointData: endpointInterface) => {
    await redis.rpush(`usage:${userId}`, JSON.stringify(endpointData));
};

export const getUsageData = async (userId: string) => {
  const data = await redis.lrange(`usage:${userId}`, 0, -1);

  const parsedData = data.map((item) => JSON.parse(item));

  return { data: parsedData };
};
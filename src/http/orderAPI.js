import { $host } from ".";

export const getOrder = async (track) => {
    const {order} = await $host.get('api/order', {track: track})
    console.log(order)
    return order
}
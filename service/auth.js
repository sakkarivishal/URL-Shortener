const sessionIdTouserMap = new Map();

export function setUser(id,user){
    sessionIdTouserMap.set(id,user);
}

export function getUser(id){
    return sessionIdTouserMap.get(id);
}

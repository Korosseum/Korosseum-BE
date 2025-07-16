import adjectives from './adjectives';
import nouns from './nouns';

// 랜덤 닉네임 생성 함수
export function generateColosseumNickname() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

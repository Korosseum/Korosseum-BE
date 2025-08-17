export class AuthUserDto {
  provider: 'google' | 'kakao' | 'naver';
  providerId: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
}

export interface JoinRequestDto {
  requestId: number;

  userId: number;
  companyId: number;
  status:  'pending' | 'accepted' |'rejected';
}

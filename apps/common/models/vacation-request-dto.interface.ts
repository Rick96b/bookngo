export interface VacationRequestDto {
  requestId: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'accepted' |'rejected';
  message: string;
}

//시간 설정을 위한 코드

export class Formatter {
    // 날짜 포맷: yyyy.MM.dd
    public static readonly date: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // 날짜와 시간 포맷: yyyy.MM.dd-HH:mm
    public static readonly dateTime: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    // 숫자 포맷: 미국식 숫자 포맷 (예: 1,000,000)
    public static readonly number: Intl.NumberFormat = new Intl.NumberFormat('en-US');
}


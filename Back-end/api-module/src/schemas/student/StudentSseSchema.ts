// src/schemas/student/StudentSseSchema.ts

// StudentSseDto 인터페이스: SSE를 사용한 반 입장 학생 목록에 필요한 데이터 구조 정의
interface StudentSseDto {
    immigrationId: number;
    name: string;
    number: number;
}

// StudentSseDto 생성 함수: Student 객체로부터 StudentSseDto 객체 생성
function createStudentSseDto(student: any, immigrationId: number): StudentSseDto {
    return {
        immigrationId: immigrationId,
        name: student.getName(),
        number: student.getNumber(),
    };
}

export { StudentSseDto, createStudentSseDto };

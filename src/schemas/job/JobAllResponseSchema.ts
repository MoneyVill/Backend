// src/schemas/job/JobAllResSchema.ts

import { IJobAllCol } from './JobAllColSchema';

// JobAllRes 인터페이스: 교사가 전체 직업 조회 시 반환되는 데이터 구조 정의
interface IJobAllRes {
    restJobCount: number;
    jobList: IJobAllCol[]; // IJobAllCol의 배열로 jobList 정의
}

// JobAllRes 생성 함수: JobAllRes 객체 생성
function createJobAllRes(restJobCount: number, jobList: IJobAllCol[]): IJobAllRes {
    return {
        restJobCount,
        jobList,
    };
}

export { IJobAllRes, createJobAllRes };
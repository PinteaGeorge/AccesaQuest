export interface Quest {
    id: number;
    userId: number;
    questName: string;
    questBody: string;
    completedUserId: number;
    questCompleted: boolean;
}
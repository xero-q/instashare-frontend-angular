export interface UploadedFile {
    id: number;
    original_name: string;
    new_name?: string;
    size:number;
    status:string;
    file:string;
}
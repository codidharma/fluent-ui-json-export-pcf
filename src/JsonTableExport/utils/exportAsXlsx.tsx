import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const ExportAsXlsx = (data: any[], fileName: string): void =>{
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = {Sheets: {'data': workSheet}, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(excelData, fileName);
};
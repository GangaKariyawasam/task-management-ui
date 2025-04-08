import React from "react";
import { Table, TableProps, PaginationProps } from 'antd';

import styles from './datatable.module.less';

interface DataTableProps extends TableProps<any> {
}

const DataTable: React.FC<DataTableProps> = ({ ...props}) => {

    return(
        <div className={styles.container}>
            <Table sticky {...props} />
        </div>
    )
}

export default DataTable;




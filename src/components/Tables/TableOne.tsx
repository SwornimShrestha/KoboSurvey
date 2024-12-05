import { useEffect, useState, useMemo, useContext } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ApiConfigContext } from '../../context/ApiConfigContext';
import { useSearchParams } from 'react-router-dom';
import { Badge, Button, Loader } from '@mantine/core';
import SelectSurveyCard from '../SelectSurveyCard';
import CardDataStats from '../CardDataStats';
import { IconList } from '@tabler/icons-react';

const TableOne = () => {
  const [surveyDetails, setSurveyDetails] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiconfig } = useContext(ApiConfigContext);

  const [searchParams] = useSearchParams();

  const uid = searchParams.get('uid');
  console.log(uid);

  useEffect(() => {
    if (uid) {
      fetchSurveyDetails(uid);
    }
  }, [uid]);
  const fetchSurveyDetails = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/${apiconfig?.baseUrl}/${id}/data.json`, {
        headers: {
          Authorization: `Token ${apiconfig?.apikey}`,
        },
      });

      if (!res.ok)
        throw new Error(
          `Failed to fetch survey details. Status: ${res.status}`,
        );

      setSurveyDetails(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tableHeaders = useMemo(
    () =>
      surveyDetails?.results?.length
        ? Object.keys(surveyDetails.results[0]).filter(
            (header) =>
              ![
                '_id',
                'formhub/uuid',
                'start',
                'end',
                '__version__',
                'submitted_by',
                'validation_status',
                '_notes',
                '_tags',
                '_status',
                '_instanceID',
                '_xform_id_string',
                '_uuid',
                '_attachments',
                '_geolocation',
                'instanceID',
                '_validation_status',
              ].includes(header),
          )
        : [],
    [surveyDetails],
  );

  const columns = useMemo(
    () =>
      tableHeaders.map((header) => ({
        accessorKey: header,
        header: header.split('/').pop().replaceAll('_', ' '),
      })),
    [tableHeaders],
  );

  const tableData = useMemo(
    () => surveyDetails?.results || [],
    [surveyDetails],
  );

  const table = useMantineReactTable({
    columns,
    data: tableData,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      density: 'xs',
    },
    mantineTableHeadCellProps: {
      style: {
        backgroundColor: '#f0f0f0',
        color: '#333',
      },
    },
    mantinePaginationProps: {
      showRowsPerPage: true,
    },

    paginationDisplayMode: 'pages',
  });

  if (!uid)
    return (
      <div>
        <SelectSurveyCard />
      </div>
    );
  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!surveyDetails?.results?.length)
    return <div>No data available for the selected survey.</div>;

  return (
    <div>
      {surveyDetails ? (
        <div className="flex justify-end mb-4">
          <Button
            color="blue"
            mt="md"
            radius="md"
            leftSection={<IconList size={14} />}
          >
            No of Submissions : <span>4</span>
          </Button>
        </div>
      ) : (
        <p>No details available.</p>
      )}

      <MantineReactTable table={table} />
    </div>
  );
};

export default TableOne;

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getLaunches } from "../../services/api";
import { Table, Loader, Button, TextInput, Group, Text, ScrollArea, UnstyledButton, Center, Container } from '@mantine/core';
import { Link } from 'react-router-dom';

const ResourceList = () => {
  const { data, error, isLoading } = useQuery({ queryFn: getLaunches });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date_utc' | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <p>Error fetching data</p>;


  const sortData = (data: any[]) => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = sortBy === 'date_utc' ? new Date(a[sortBy]).getTime() : a[sortBy];
      const bValue = sortBy === 'date_utc' ? new Date(b[sortBy]).getTime() : b[sortBy];

      if (reverseSortDirection) {
        return bValue < aValue ? -1 : 1;
      }
      return aValue < bValue ? -1 : 1;
    });
  };


  const filteredData = data.filter((launch: any) =>
    launch.name.toLowerCase().includes(search.toLowerCase()) ||
    new Date(launch.date_utc).toLocaleDateString().includes(search.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = (field: 'name' | 'date_utc') => {
    setSortBy(field);
    setReverseSortDirection(sortBy === field ? !reverseSortDirection : false);
  };

  return (
    <Container>
      <div>
        <div style={{ marginTop: '20px', paddingLeft: '25px', paddingRight: '25px' }}>
          <TextInput
            placeholder="Search by name or date"
            value={search}
            onChange={handleSearchChange}
            mb="md"
          />
        </div>
        <div style={{ marginTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
          <ScrollArea>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} withBorder>
              <thead>
                <tr>
                  <th>
                    <UnstyledButton onClick={() => handleSort('name')}>
                      <Group position="apart">
                        <Text size="sm" weight={500}>Name</Text>
                        <Center>
                          {sortBy === 'name' && (reverseSortDirection ? '↓' : '↑')}
                          {sortBy !== 'name' && '⇅'}
                        </Center>
                      </Group>
                    </UnstyledButton>
                  </th>
                  <th>
                    <UnstyledButton onClick={() => handleSort('date_utc')}>
                      <Group position="apart">
                        <Text size="sm" weight={500}>Date</Text>
                        <Center>
                          {sortBy === 'date_utc' && (reverseSortDirection ? '↓' : '↑')}
                          {sortBy !== 'date_utc' && '⇅'}
                        </Center>
                      </Group>
                    </UnstyledButton>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortData(filteredData).map((launch: any) => (
                  <tr key={launch.id}>
                    <td>{launch.name}</td>
                    <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
                    <td>
                      <Button component={Link} to={`/launches/${launch.id}`} variant="outline">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                      <Text>No data found</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Container>
  );
}

export default ResourceList;

'use client';

import { useEffect, useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch employees');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="grid gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="border p-4 rounded-lg">
            <h2 className="font-bold">{employee.name}</h2>
            <p>Role: {employee.role}</p>
            <p>Salary: ${employee.salary}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
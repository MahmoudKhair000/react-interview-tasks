import React, { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dynamically import task components
const taskComponents = {
	['01']: {
		Buggy: lazy(() => import('../tasks/task-01/Buggy')),
		Fixed: lazy(() => import('../tasks/task-01/Fixed')),
	},
};
// const taskComponents = {
//   "01": {
//     Buggy: lazy(() => import("../tasks/task-01/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-01/Fixed")),
//   },
//   "02": {
//     Buggy: lazy(() => import("../tasks/task-02/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-02/Fixed")),
//   },
//   "03": {
//     Buggy: lazy(() => import("../tasks/task-03/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-03/Fixed")),
//   },
//   "04": {
//     Buggy: lazy(() => import("../tasks/task-04/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-04/Fixed")),
//   },
//   "05": {
//     Buggy: lazy(() => import("../tasks/task-05/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-05/Fixed")),
//   },
//   "06": {
//     Buggy: lazy(() => import("../tasks/task-06/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-06/Fixed")),
//   },
//   "07": {
//     Buggy: lazy(() => import("../tasks/task-07/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-07/Fixed")),
//   },
//   "08": {
//     Buggy: lazy(() => import("../tasks/task-08/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-08/Fixed")),
//   },
//   "09": {
//     Buggy: lazy(() => import("../tasks/task-09/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-09/Fixed")),
//   },
//   10: {
//     Buggy: lazy(() => import("../tasks/task-10/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-10/Fixed")),
//   },
//   11: {
//     Buggy: lazy(() => import("../tasks/task-11/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-11/Fixed")),
//   },
//   12: {
//     Buggy: lazy(() => import("../tasks/task-12/Buggy")),
//     Fixed: lazy(() => import("../tasks/task-12/Fixed")),
//   },
// };

function getComponents(id) {
	const componentId = id < 10 ? `0${id}` : `${id}`;

	return {
		Buggy: lazy(() => import(`../tasks/task-${componentId}/Buggy`)),
		Fixed: lazy(() => import(`../tasks/task-${componentId}/Fixed`)),
	};
}

function TaskPage() {
	const { taskId } = useParams();
	const navigate = useNavigate();

	const components = getComponents(Number(taskId));

	if (!components) {
		return (
			<div className="container">
				<div
					className="text-center"
					style={{ marginTop: '4rem' }}>
					<h1>Task Not Found</h1>
					<button
						className="btn btn-primary mt-2"
						onClick={() => navigate('/')}>
						Back to Dashboard
					</button>
				</div>
			</div>
		);
	}

	const BuggyComponent = components.Buggy;
	const FixedComponent = components.Fixed;

	return (
		<div className="container task-page">
			<button
				className="back-button"
				onClick={() => navigate('/')}>
				← Back to Dashboard
			</button>

			<div className="task-content">
				<div className="demo-section">
					<h2 className="buggy-label">🐛 Buggy Version</h2>
					<div className="demo-container">
						<Suspense fallback={<div>Loading...</div>}>
							<BuggyComponent />
						</Suspense>
					</div>
				</div>

				<div className="demo-section">
					<h2 className="fixed-label">✅ Fixed Version</h2>
					<div className="demo-container">
						<Suspense fallback={<div>Loading...</div>}>
							<FixedComponent />
						</Suspense>
					</div>
				</div>
			</div>

			<div className="demo-section">
				<h2>📚 Explanation</h2>
				<div style={{ padding: 'var(--spacing-md)' }}>
					<p style={{ color: 'var(--text-secondary)' }}>
						Check the README.md file in the task folder for a detailed
						explanation of the issue, why it happens, and how to fix it.
					</p>
				</div>
			</div>
		</div>
	);
}

export default TaskPage;

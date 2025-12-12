export const MOCK_PROJECTS = [
    {
        id: '1',
        name: 'E-commerce Platform',
        url: 'https://shop.example.com',
        status: 'active',
        feedbackCount: 12,
        lastActive: '2 min ago',
        icon: 'Store'
    },
    {
        id: '2',
        name: 'SaaS Dashboard',
        url: 'https://app.saas.com',
        status: 'active',
        feedbackCount: 5,
        lastActive: '1 hour ago',
        icon: 'LayoutDashboard'
    },
    {
        id: '3',
        name: 'Portfolio Site',
        url: 'https://alice.dev',
        status: 'archived',
        feedbackCount: 0,
        lastActive: '2 weeks ago',
        icon: 'Briefcase'
    }
];

export const MOCK_FEEDBACKS = [
    {
        id: '101',
        projectId: '1',
        type: 'bug',
        content: 'Checkout button is misaligned on mobile',
        element: 'button.checkout-btn',
        path: '/checkout',
        reporter: 'alice@example.com',
        timestamp: '2025-12-11T10:30:00Z',
        status: 'new',
        priority: 'high',
        browser: 'Chrome 120'
    },
    {
        id: '102',
        projectId: '1',
        type: 'design',
        content: 'The font color is too light here',
        element: 'p.description',
        path: '/product/123',
        reporter: 'bob@design.com',
        timestamp: '2025-12-11T11:15:00Z',
        status: 'in-progress',
        priority: 'medium',
        browser: 'Firefox 121'
    },
    {
        id: '103',
        projectId: '2',
        type: 'feature',
        content: 'Add dark mode toggle',
        element: 'nav.top-bar',
        path: '/settings',
        reporter: 'charlie@users.com',
        timestamp: '2025-12-10T09:00:00Z',
        status: 'resolved',
        priority: 'low',
        browser: 'Safari 17'
    }
];

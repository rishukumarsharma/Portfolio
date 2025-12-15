export const placeholderImages = {
    hero: {
        large: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080&fit=crop",
        mobile: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=768&h=1024&fit=crop"
    },
    projects: {
        saas1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        saas2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        crm1: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
        landing1: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop",
        webapp1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        mobile1: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop"
    },
    caseStudy: {
        hero: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop",
        process: [
            "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop"
        ],
        mockups: [
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=900&fit=crop",
            "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=1200&h=900&fit=crop"
        ]
    },
    testimonials: {
        avatar: "https://i.pravatar.cc/150?img="
    }
};

export type PlaceholderCategory = keyof typeof placeholderImages;

export const getPlaceholder = (category: PlaceholderCategory, key?: string): string | typeof placeholderImages[PlaceholderCategory] => {
    if (key && typeof placeholderImages[category] === 'object' && key in placeholderImages[category]) {
        return (placeholderImages[category] as any)[key];
    }
    return placeholderImages[category];
};

// Helper to get project placeholder based on category
export const getProjectPlaceholder = (category?: string): string => {
    if (!category) return placeholderImages.projects.saas1;

    const normalized = category.toLowerCase().replace(/\s+/g, '');

    if (normalized.includes('saas')) return placeholderImages.projects.saas1;
    if (normalized.includes('crm')) return placeholderImages.projects.crm1;
    if (normalized.includes('landing') || normalized.includes('ecommerce')) return placeholderImages.projects.landing1;
    if (normalized.includes('webapp') || normalized.includes('web')) return placeholderImages.projects.webapp1;
    if (normalized.includes('mobile') || normalized.includes('app')) return placeholderImages.projects.mobile1;

    return placeholderImages.projects.saas1;
};

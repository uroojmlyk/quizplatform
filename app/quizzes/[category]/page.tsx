import { redirect } from 'next/navigation';

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Redirect to main quizzes page with category filter
  redirect(`/quizzes?category=${params.category}`);
}
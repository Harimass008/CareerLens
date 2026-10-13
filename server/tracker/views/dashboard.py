from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView
from tracker.models import Application
from tracker.serializers import ApplicationSerializer

class DashboardView(APIView):
    def get(self, request):
        queryset = Application.objects.filter(user=request.user)
        counts = {row["status"]: row["total"] for row in queryset.values("status").annotate(total=Count("id"))}
        recent = queryset[:5]
        return Response({
            "total": queryset.count(),
            "status_counts": counts,
            "recent": ApplicationSerializer(recent, many=True).data,
        })

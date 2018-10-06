/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../../test.module';
import { DivisionComponent } from 'app/entities/test-root/division/division.component';
import { DivisionService } from 'app/entities/test-root/division/division.service';
import { Division } from 'app/shared/model/test-root/division.model';

describe('Component Tests', () => {
    describe('Division Management Component', () => {
        let comp: DivisionComponent;
        let fixture: ComponentFixture<DivisionComponent>;
        let service: DivisionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [DivisionComponent],
                providers: []
            })
                .overrideTemplate(DivisionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DivisionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DivisionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Division(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.divisions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

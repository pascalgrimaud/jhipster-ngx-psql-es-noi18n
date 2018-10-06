/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravisPsqlEsNoi18NTestModule } from '../../../test.module';
import { TestOneToOneMySuffixComponent } from 'app/entities/test-one-to-one-my-suffix/test-one-to-one-my-suffix.component';
import { TestOneToOneMySuffixService } from 'app/entities/test-one-to-one-my-suffix/test-one-to-one-my-suffix.service';
import { TestOneToOneMySuffix } from 'app/shared/model/test-one-to-one-my-suffix.model';

describe('Component Tests', () => {
    describe('TestOneToOneMySuffix Management Component', () => {
        let comp: TestOneToOneMySuffixComponent;
        let fixture: ComponentFixture<TestOneToOneMySuffixComponent>;
        let service: TestOneToOneMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TravisPsqlEsNoi18NTestModule],
                declarations: [TestOneToOneMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TestOneToOneMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestOneToOneMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestOneToOneMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TestOneToOneMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.testOneToOnes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
